
const imgElements = document.querySelectorAll('[id*="imagetext"] img');
imgElements.forEach(imgElement => { 
    imgElement.style.height = 'auto';
    imgElement.style.position = 'absolute';
    imgElement.style.top = '50%';
    imgElement.style.setProperty('transform', 'translateY(-50%)', 'important');
});