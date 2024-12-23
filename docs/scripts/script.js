document.addEventListener('DOMContentLoaded', function() {
    const registerAreaBtn = document.getElementById('registerAreaBtn');
    const registerScheduleBtn = document.getElementById('registerScheduleBtn');
    const reportWorkBtn = document.getElementById('reportWorkBtn');
    const registerAreaForm = document.getElementById('registerAreaForm');
    const registerScheduleForm = document.getElementById('registerScheduleForm');
    const reportWorkForm = document.getElementById('reportWorkForm');
    const sameAsLastWeekCheckbox = document.getElementById('sameAsLastWeek');
    const scheduleCheckboxes = document.querySelectorAll('input[name="schedule"]');

    registerAreaBtn.addEventListener('click', () => {
        registerAreaForm.style.display = 'block';
        registerScheduleForm.style.display = 'none';
        reportWorkForm.style.display = 'none';
    });

    registerScheduleBtn.addEventListener('click', () => {
        registerAreaForm.style.display = 'none';
        registerScheduleForm.style.display = 'block';
        reportWorkForm.style.display = 'none';
    });

    reportWorkBtn.addEventListener('click', () => {
        registerAreaForm.style.display = 'none';
        registerScheduleForm.style.display = 'none';
        reportWorkForm.style.display = 'block';
    });

    sameAsLastWeekCheckbox.addEventListener('change', () => {
        const isChecked = sameAsLastWeekCheckbox.checked;
        scheduleCheckboxes.forEach(checkbox => {
            checkbox.disabled = isChecked;
        });
    });

    function populateTimeSelectors() {
        const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
        const minutes = Array.from({ length: 6 }, (_, i) => (i * 10).toString().padStart(2, '0'));

        const startHour = document.getElementById('startHour');
        const startMinute = document.getElementById('startMinute');
        const endHour = document.getElementById('endHour');
        const endMinute = document.getElementById('endMinute');

        hours.forEach(hour => {
            const option = document.createElement('option');
            option.value = hour;
            option.textContent = hour;
            startHour.appendChild(option.cloneNode(true));
            endHour.appendChild(option.cloneNode(true));
        });

        minutes.forEach(minute => {
            const option = document.createElement('option');
            option.value = minute;
            option.textContent = minute;
            startMinute.appendChild(option.cloneNode(true));
            endMinute.appendChild(option.cloneNode(true));
        });
    }

    populateTimeSelectors();

    window.submitAreaForm = function() {
        const workArea = document.getElementById('workArea').value;
        const areaUserName = document.getElementById('areaUserName').value;
        const startHour = document.getElementById('startHour').value;
        const startMinute = document.getElementById('startMinute').value;
        const endHour = document.getElementById('endHour').value;
        const endMinute = document.getElementById('endMinute').value;

        const startTime = `${startHour}:${startMinute}`;
        const endTime = `${endHour}:${endMinute}`;

        if (workArea && areaUserName && startHour && startMinute && endHour && endMinute) {
            const scriptURL = "https://script.google.com/macros/s/AKfycbwAQoD3fG0t0UVgEnB-FpUM0eK8wERGD5b-ZsM9-GcOLSiINmkzP1PaR-n2Ju3nMtze/exec";
            
            // Hiển thị thông báo ngay lập tức
        const notification = document.getElementById('notification');
        notification.innerText = "Đang xử lý ...";
        notification.style.display = 'block';

            fetch(scriptURL, {
                method: 'POST',
                body: new URLSearchParams({
                    action: 'registerArea',
                    workArea: workArea,
                    userName: areaUserName,
                    startTime: startTime,
                    endTime: endTime
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    alert("Đăng ký khu vực thành công!");
                    document.getElementById('areaForm').reset();
                } else {
                    alert("Đã xảy ra lỗi. Vui lòng thử lại!");
                }
            // Ẩn thông báo sau khi hiển thị thông báo thành công hoặc lỗi
            setTimeout(() => {notification.style.display = 'none';}, 1);
            })
            .catch(error => alert("Không thể gửi dữ liệu. Vui lòng kiểm tra lại!"));
        } 
        else {
            alert('Vui lòng điền đầy đủ thông tin!');
        }
    }

    window.submitScheduleForm = function() {
        const scheduleUserName = document.getElementById('scheduleUserName').value;
        const sameAsLastWeek = document.getElementById('sameAsLastWeek').checked;

        if (sameAsLastWeek) {
            const scriptURL = "https://script.google.com/macros/s/AKfycbwAQoD3fG0t0UVgEnB-FpUM0eK8wERGD5b-ZsM9-GcOLSiINmkzP1PaR-n2Ju3nMtze/exec";
        // Hiển thị thông báo ngay lập tức
        const notification = document.getElementById('notification');
        notification.innerText = "Đang xử lý ...";
        notification.style.display = 'block';
            fetch(scriptURL, {
                method: 'POST',
                body: new URLSearchParams({
                    action: 'registerSchedule',
                    userName: scheduleUserName,
                    schedules: "Như tuần trước"
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    alert("Đăng ký lịch làm việc thành công!");
                    document.getElementById('scheduleForm').reset();
                } else {
                    alert("Đã xảy ra lỗi. Vui lòng thử lại!");
                }
                // Ẩn thông báo sau khi hiển thị thông báo thành công hoặc lỗi
            setTimeout(() => {notification.style.display = 'none';}, 1);
            })
            .catch(error => alert("Không thể gửi dữ liệu. Vui lòng kiểm tra lại!"));
        } else {
            const scheduleSelections = Array.from(document.querySelectorAll('input[name="schedule"]:checked')).map(selection => selection.value);
            if (scheduleUserName && scheduleSelections.length > 0) {
                const scriptURL = "https://script.google.com/macros/s/AKfycbwAQoD3fG0t0UVgEnB-FpUM0eK8wERGD5b-ZsM9-GcOLSiINmkzP1PaR-n2Ju3nMtze/exec";
            // Hiển thị thông báo ngay lập tức
            const notification = document.getElementById('notification');
            notification.innerText = "Đang xử lý ...";
            notification.style.display = 'block';
                fetch(scriptURL, {
                    method: 'POST',
                    body: new URLSearchParams({
                        action: 'registerSchedule',
                        userName: scheduleUserName,
                        schedules: scheduleSelections.join(", ")
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.status === "success") {
                        alert("Đăng ký lịch làm việc thành công!");
                        document.getElementById('scheduleForm').reset();
                    } else {
                        alert("Đã xảy ra lỗi. Vui lòng thử lại!");
                    }
                    // Ẩn thông báo sau khi hiển thị thông báo thành công hoặc lỗi
            setTimeout(() => {notification.style.display = 'none';}, 1);
                })
                .catch(error => alert("Không thể gửi dữ liệu. Vui lòng kiểm tra lại!"));
            } else {
                alert('Vui lòng nhập tên và chọn ít nhất một lịch làm việc!');
            }
        }
    }

    window.submitWorkReportForm = function() {
        const reportUserName = document.getElementById('reportUserName').value;
        const reportStartDate = document.getElementById('reportStartDate').value;
        const reportEndDate = document.getElementById('reportEndDate').value;
        const reportContent = document.getElementById('reportContent').value;

        if (reportUserName && reportStartDate && reportEndDate && reportContent) {
            const scriptURL = "https://script.google.com/macros/s/AKfycbwAQoD3fG0t0UVgEnB-FpUM0eK8wERGD5b-ZsM9-GcOLSiINmkzP1PaR-n2Ju3nMtze/exec";
        // Hiển thị thông báo ngay lập tức
        const notification = document.getElementById('notification');
        notification.innerText = "Đang xử lý ...";
        notification.style.display = 'block';
            fetch(scriptURL, {
                method: 'POST',
                body: new URLSearchParams({
                    action: 'reportWork',
                    userName: reportUserName,
                    startDate: reportStartDate,
                    endDate: reportEndDate,
                    reportContent: reportContent
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    alert("Báo cáo công việc thành công!");
                    document.getElementById('workReportForm').reset();
                } else {
                    alert("Đã xảy ra lỗi. Vui lòng thử lại!");
                }
                // Ẩn thông báo sau khi hiển thị thông báo thành công hoặc lỗi
            setTimeout(() => {notification.style.display = 'none';}, 1);
            })
            .catch(error => alert("Không thể gửi dữ liệu. Vui lòng kiểm tra lại!"));
        } else {
            alert('Vui lòng điền đầy đủ thông tin!');
        }
    }
});