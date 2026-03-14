// 预约表单处理
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        // 设置最小日期为今天
        const dateInput = document.getElementById('date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.min = today;
            dateInput.value = today;
        }
        
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const service = document.querySelector('input[name="service"]:checked').value;
            const notes = document.getElementById('notes').value;
            
            // 简单验证
            if (!name || !phone) {
                showMessage('请填写姓名和电话', 'error');
                return;
            }
            
            // 电话格式简单验证
            if (!/^1[3-9]\d{9}$/.test(phone)) {
                showMessage('请输入正确的手机号', 'error');
                return;
            }
            
            // 模拟提交成功（实际应该发到服务器）
            console.log('预约信息：', { name, phone, date, time, service, notes });
            
            // 显示成功信息
            showMessage('预约成功！我们会尽快电话确认', 'success');
            
            // 清空表单
            bookingForm.reset();
            if (dateInput) dateInput.value = today;
        });
    }
    
    function showMessage(msg, type) {
        const messageDiv = document.getElementById('formMessage');
        if (messageDiv) {
            messageDiv.textContent = msg;
            messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
            messageDiv.style.display = 'block';
            
            // 3秒后自动隐藏
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 3000);
        }
    }
    
    // 为所有电话链接添加点击统计（可选）
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('电话点击：', this.href);
        });
    });
    
    // 为所有外部链接添加安全属性
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.setAttribute('rel', 'noopener noreferrer');
    });
});