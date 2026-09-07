document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // 1. فحص وتطبيق الثيم المحفوظ فوراً عند تحميل أي صفحة
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark-theme';
    body.className = savedTheme;

    // تحديث الأيقونة إذا كان الزر موجوداً في الصفحة الحالية
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('.icon');
        updateIcon(savedTheme, themeIcon);

        // 2. تفعيل زر التبديل عند الضغط عليه
        themeToggleBtn.addEventListener('click', () => {
            if (body.classList.contains('dark-theme')) {
                body.className = 'light-theme';
                localStorage.setItem('portfolio-theme', 'light-theme');
                updateIcon('light-theme', themeIcon);
            } else {
                body.className = 'dark-theme';
                localStorage.setItem('portfolio-theme', 'dark-theme');
                updateIcon('dark-theme', themeIcon);
            }
        });
    }

    // دالة تحديث الأيقونة
    function updateIcon(currentTheme, iconElement) {
        if (!iconElement) return;
        if (currentTheme === 'dark-theme') {
            iconElement.textContent = '🔮';
        } else {
            iconElement.textContent = '👑';
        }
    }

    // ==========================================
    // كود هالة الماوس التفاعلية (يعمل فقط إذا وُجد العنصر والماوس)
    // ==========================================
    const aura = document.getElementById('mouse-aura');
    if (aura) {
        window.addEventListener('mousemove', (e) => {
            aura.style.left = e.clientX + 'px';
            aura.style.top = e.clientY + 'px';
        });

        // تفعيل الهالة الخاصة بقسم الشغف إذا وُجد في الصفحة (مثل الصفحة الرئيسية)
        const passionSection = document.querySelector('.brief-about');
        if (passionSection) {
            passionSection.addEventListener('mouseenter', () => aura.classList.add('passion-active'));
            passionSection.addEventListener('mouseleave', () => aura.classList.remove('passion-active'));
        }
    }

    // ==========================================
    // كود إرسال الفورم (تم نقله هنا بالداخل ليعمل بنجاح)
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault(); // منع الصفحة من الانتقال لـ Formspree

            // تجهيز البيانات لإرسالها
            const data = new FormData(contactForm);

            // تغيير نص الزر أثناء الإرسال ليعرف المستخدم أن العملية جارية
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = "جاري إرسال الطاقة... ⏳";
            submitBtn.disabled = true;

            // إرسال البيانات إلى Formspree في الخلفية
            fetch('https://formspree.io/f/mgaenkdg', {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    // إظهار رسالة النجاح وتلوينها بناءً على الثيم
                    formStatus.style.display = "block";
                    formStatus.style.color = "var(--glow-color)";
                    formStatus.textContent = "تم إرسال رسالتك بنجاح! سيتم نقلك للرئيسية فوراً... 🌌";

                    contactForm.reset(); // تفريغ حقول الإدخال

                    // التحويل التلقائي للصفحة الرئيسية بعد ثانيتين (2000 مللي ثانية)
                    setTimeout(() => {
                        window.location.href = "index.html";
                    }, 2000);
                } else {
                    throw new Error('حدث خطأ أثناء الإرسال');
                }
            }).catch(error => {
                // في حال حدوث مشكلة في الإنترنت أو السيرفر
                formStatus.style.display = "block";
                formStatus.style.color = "#ef4444"; // لون أحمر للخطأ
                formStatus.textContent = "عذراً، حدث خطأ أثناء إرسال الرسالة. حاول مجدداً.";

                // إعادة الزر لحالته الأصلية
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }

}); // إغلاق دالة DOMContentLoaded في النهاية تماماً
