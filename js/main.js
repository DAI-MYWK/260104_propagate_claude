// ============================================
// Main JavaScript
// ============================================

(function() {
  'use strict';

  // ============================================
  // Form Validation
  // ============================================
  function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
      
      inputs.forEach(input => {
        // Validate on blur
        input.addEventListener('blur', function() {
          validateField(this);
        });
        
        // Clear error on input
        input.addEventListener('input', function() {
          if (this.classList.contains('error')) {
            this.classList.remove('error');
            const errorElement = this.parentElement.querySelector('.form-error');
            if (errorElement) {
              errorElement.textContent = '';
            }
          }
        });
      });
      
      // Validate on submit
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        inputs.forEach(input => {
          if (!validateField(input)) {
            isValid = false;
          }
        });
        
        if (isValid) {
          // Form is valid, you can submit
          console.log('Form is valid!');
          // In production, you would submit the form data to the server
          // form.submit();
          alert('フォームが送信されました！');
        } else {
          // Scroll to first error
          const firstError = form.querySelector('.error');
          if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      });
    });
  }
  
  function validateField(field) {
    const errorElement = field.parentElement.querySelector('.form-error');
    let errorMessage = '';
    
    // Check if field is empty
    if (field.hasAttribute('required') && !field.value.trim()) {
      errorMessage = 'この項目は必須です';
    }
    // Check email format
    else if (field.type === 'email' && field.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        errorMessage = 'メールアドレスの形式が正しくありません';
      }
    }
    // Check phone format
    else if (field.type === 'tel' && field.value) {
      const phoneRegex = /^[0-9-]+$/;
      if (!phoneRegex.test(field.value)) {
        errorMessage = '電話番号の形式が正しくありません';
      }
    }
    // Check textarea min length
    else if (field.tagName === 'TEXTAREA' && field.value.length > 0 && field.value.length < 10) {
      errorMessage = '10文字以上入力してください';
    }
    // Check select
    else if (field.tagName === 'SELECT' && (field.value === '' || field.value === '選択してください')) {
      errorMessage = '選択してください';
    }
    // Check checkbox
    else if (field.type === 'checkbox' && field.hasAttribute('required') && !field.checked) {
      errorMessage = 'この項目に同意してください';
    }
    
    if (errorMessage) {
      field.classList.add('error');
      if (errorElement) {
        errorElement.textContent = errorMessage;
      }
      return false;
    } else {
      field.classList.remove('error');
      if (errorElement) {
        errorElement.textContent = '';
      }
      return true;
    }
  }
  
  // ============================================
  // Scroll Animation
  // ============================================
  function initScrollAnimation() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('fade-in-up');
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  }
  
  // ============================================
  // Case Studies Filter
  // ============================================
  function initCaseStudiesFilter() {
    const filterButtons = document.querySelectorAll('.case-studies__filter-btn');
    const caseCards = document.querySelectorAll('.case-card');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('case-studies__filter-btn--active'));
        this.classList.add('case-studies__filter-btn--active');
        
        const category = this.dataset.category;
        
        // Filter cards
        caseCards.forEach(card => {
          if (category === 'all' || card.dataset.category.includes(category)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
  
  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Ignore if href is just "#"
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerHeight = 80;
          const targetPosition = target.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
  
  // ============================================
  // FAQ Accordion
  // ============================================
  function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq__item');
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq__question');
      const answer = item.querySelector('.faq__answer');
      
      if (question && answer) {
        question.addEventListener('click', function() {
          const isOpen = item.classList.contains('faq__item--open');
          
          // Close all items
          faqItems.forEach(i => {
            i.classList.remove('faq__item--open');
            const a = i.querySelector('.faq__answer');
            if (a) a.style.maxHeight = null;
          });
          
          // Open clicked item if it was closed
          if (!isOpen) {
            item.classList.add('faq__item--open');
            answer.style.maxHeight = answer.scrollHeight + 'px';
          }
        });
      }
    });
  }
  
  // ============================================
  // Header Scroll Effect
  // ============================================
  function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
      }
      
      lastScroll = currentScroll;
    });
  }
  
  // ============================================
  // Initialize Everything
  // ============================================
  document.addEventListener('DOMContentLoaded', function() {
    initFormValidation();
    initScrollAnimation();
    initCaseStudiesFilter();
    initSmoothScroll();
    initFAQAccordion();
    initHeaderScroll();
    
    console.log('Propagate Inc. - Website initialized');
  });
  
})();

