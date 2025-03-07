document.addEventListener('DOMContentLoaded', function() {
  // Add any JavaScript for interactive elements here

  // Example: Smooth scrolling for anchor links
  const links = document.querySelectorAll('a[href^="#"]');
  for (const link of links) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  }

  // Add animations for interactive elements
  const fadeInElements = document.querySelectorAll('.fade-in');
  for (const element of fadeInElements) {
    element.classList.add('fade-in');
  }

  // Add JavaScript for new sections: skills, testimonials, and blog
  const skills = [
    { name: 'Skill 1', description: 'Description of skill 1' },
    { name: 'Skill 2', description: 'Description of skill 2' },
    { name: 'Skill 3', description: 'Description of skill 3' }
  ];

  const testimonials = [
    { name: 'Testimonial 1', description: 'Description of testimonial 1' },
    { name: 'Testimonial 2', description: 'Description of testimonial 2' },
    { name: 'Testimonial 3', description: 'Description of testimonial 3' }
  ];

  const blogPosts = [
    { title: 'Blog Post 1', description: 'Description of blog post 1' },
    { title: 'Blog Post 2', description: 'Description of blog post 2' },
    { title: 'Blog Post 3', description: 'Description of blog post 3' }
  ];

  const skillsList = document.querySelector('#skills ul');
  for (const skill of skills) {
    const li = document.createElement('li');
    li.textContent = `${skill.name}: ${skill.description}`;
    skillsList.appendChild(li);
  }

  const testimonialsList = document.querySelector('#testimonials ul');
  for (const testimonial of testimonials) {
    const li = document.createElement('li');
    li.textContent = `${testimonial.name}: ${testimonial.description}`;
    testimonialsList.appendChild(li);
  }

  const blogList = document.querySelector('#blog ul');
  for (const post of blogPosts) {
    const li = document.createElement('li');
    li.textContent = `${post.title}: ${post.description}`;
    blogList.appendChild(li);
  }

  // Add event listeners for interactive elements
  const interactiveElements = document.querySelectorAll('.interactive');
  for (const element of interactiveElements) {
    element.addEventListener('click', function() {
      alert('You clicked an interactive element!');
    });
  }
});
