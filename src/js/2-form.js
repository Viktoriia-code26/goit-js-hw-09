const formData = {
  email: '',
  message: '',
};

const feedbackForm = document.querySelector('.feedback-form');

const loadFormData = () => {
  const savedData = localStorage.getItem('feedback-form-state');
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      formData.email = parsedData.email || '';
      formData.message = parsedData.message || '';

      feedbackForm.elements.email.value = formData.email;
      feedbackForm.elements.message.value = formData.message;
    } catch (error) {
      console.error('Error parsing saved form data:', error);
    }
  }
};

const saveFormData = () => {
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};
feedbackForm.addEventListener('input', event => {
  if (event.target.name === 'email' || event.target.name === 'message') {
    formData[event.target.name] = event.target.value.trim();
    saveFormData();
  }
});

feedbackForm.addEventListener('submit', event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem('feedback-form-state');
  formData.email = '';
  formData.message = '';
  feedbackForm.reset();
});

document.addEventListener('DOMContentLoaded', loadFormData);
