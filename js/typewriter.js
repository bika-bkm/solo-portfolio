document.addEventListener('DOMContentLoaded', () => {
    // 1. تحديد العناصر والنصوص المراد كتابتها
    const dynamicTextElement = document.getElementById('dynamic-text');

    // النصوص الخاصة بالتخصصات الثلاثة
    const words = [
        "مطور ألعاب يبني العوالم الرقمية..",
        "مبرمج مواقـع يحول الأفكار إلى واقع..",
        "باحث أمن سيبراني يحمي البيانات والأنظمة.."
    ];

    // 2. إعداد المتغيرات الأساسية للحركة
    let wordIndex = 0;    // مؤشر الكلمة الحالية في المصفوفة
    let charIndex = 0;    // مؤشر الحرف الحالي في الكلمة
    let isDeleting = false; // حالة تحديد ما إذا كنا نكتب أم نمسح النص
    let typingSpeed = 100;  // السرعة الافتراضية للكتابة (بالملي ثانية)

    // 3. دالة التأثير الأساسية
    function typeEffect() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            // إذا كنا في حالة المسح، نقوم بإنقاص حرف
            dynamicTextElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40; // جعل سرعة المسح أسرع من الكتابة
        } else {
            // إذا كنا في حالة الكتابة، نقوم بزيادة حرف
            dynamicTextElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // سرعة الكتابة العادية
        }

        // 4. التحكم في الانتقال بين الحالات

        // إذا اكتملت كتابة الكلمة بالكامل
        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2000; // انتظر ثانيتين (2000ms) قبل البدء في مسح الكلمة ليقرأها المستخدم
            isDeleting = true;
        }
        // إذا تم مسح الكلمة بالكامل
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            // الانتقال للكلمة التالية في المصفوفة، وإذا وصلنا للنهاية نعود للكلمة الأولى
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // انتظر نصف ثانية قبل بدء كتابة الكلمة الجديدة
        }

        // استدعاء الدالة بشكل متكرر بناءً على السرعة المحددة ديناميكياً
        setTimeout(typeEffect, typingSpeed);
    }

    // 5. انطلاق التأثير لأول مرة
    if (dynamicTextElement) {
        typeEffect();
    }
});
