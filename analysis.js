document.addEventListener('DOMContentLoaded', () => {
    console.log('Analysis Page loaded!');
    
    // 85 का डमी स्कोर (इमेज के अनुसार)
    const viralityScore = 85; 
    animateViralityGauge(viralityScore);
});

function animateViralityGauge(score) {
    const gaugeFill = document.getElementById('gaugeFill');
    const scoreValueElement = document.getElementById('scoreValue');
    
    if (!gaugeFill || !scoreValueElement) return;

    // 0% = 45deg (शुरुआत), 100% = 225deg (अंत)
    const minRotation = 45;
    
    // Rotation Calculation: (Score / 100) * 180 (Range) + 45 (Minimum)
    const rotation = (score / 100) * 180 + minRotation;
    
    // CSS Transition के साथ रोटेशन लागू करें
    gaugeFill.style.transform = `rotate(${rotation}deg)`;
    
    // स्कोर वैल्यू डिस्प्ले को सेट करें
    scoreValueElement.textContent = score;
}