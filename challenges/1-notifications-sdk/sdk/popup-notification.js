/**
 * PopupNotification - A simple library for displaying popup notifications
 * triggered by postMessage events.
 */

const DEBUG = true;

class PopupNotification {
  constructor(options = {}) {
    this.options = {
      position: options.position || 'top-right',
      duration: options.duration || 3000,
      maxNotifications: options.maxNotifications || 5,
      containerClass: options.containerClass || 'popup-notification-container',
      notificationClass: options.notificationClass || 'popup-notification',
      zIndex: options.zIndex || 9999,
      targetOrigin: options.targetOrigin || '*',
    };
    
    this.notifications = [];
    this.container = null;
    
    this.initialize();
    this.setupEventListener();
  }
  
  initialize() {
    // Create container for notifications if it doesn't exist
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = this.options.containerClass;
      this.container.style.position = 'fixed';
      this.container.style.zIndex = this.options.zIndex;
      
      // Position the container based on options
      switch (this.options.position) {
        case 'top-left':
          this.container.style.top = '20px';
          this.container.style.left = '20px';
          break;
        case 'top-right':
          this.container.style.top = '20px';
          this.container.style.right = '20px';
          break;
        default:
          this.container.style.top = '20px';
          this.container.style.right = '20px';
      }
      
      document.body.appendChild(this.container);
    }
    
    // Add default styles
    this.addStyles();
  }
  
  addStyles() {
    if (!document.getElementById('popup-notification-styles')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'popup-notification-styles';
      styleEl.textContent = `
        .${this.options.containerClass} {
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-width: 300px;
        }
        
        .${this.options.notificationClass} {
          background-color: #fff;
          border-radius: 4px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
          padding: 15px;
          margin-bottom: 10px;
          animation: slide-in 0.3s ease-out forwards;
          transform: translateX(100%);
          opacity: 0;
        }
        
        .${this.options.notificationClass}.success {
          border-left: 4px solid #4caf50;
        }
        
        .${this.options.notificationClass}.error {
          border-left: 4px solid #f44336;
        }
        
        .${this.options.notificationClass}.info {
          border-left: 4px solid #2196f3;
        }
        
        .${this.options.notificationClass}.warning {
          border-left: 4px solid #ff9800;
        }
        
        .${this.options.notificationClass} .title {
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        .${this.options.notificationClass} .message {
          font-size: 14px;
        }
        
        
        @keyframes slide-in {
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes fade-out {
          to {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
      `;
      document.head.appendChild(styleEl);
    }
  }
  
  setupEventListener() {
    // Listen for postMessage events
    window.addEventListener('message', (event) => {
      if (DEBUG) {
        console.log('Received message:', event);
      }
      
      // Check origin if specified and not wildcard
      if (this.options.targetOrigin !== '*' && event.origin !== this.options.targetOrigin) {
        return;
      }
      
      const { data } = event;
      
      // Check if the message is a notification
      if (data && data.type === 'notification') {
        this.show(data.title, data.message, data.notificationType, data.duration);
      }
    });
  }
  
  show(title, message, type = 'info', duration) {
    const notificationDuration = duration || this.options.duration;
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `${this.options.notificationClass} ${type}`;
    notification.style.position = 'relative';
    
    // Add title if provided
    if (title) {
      const titleEl = document.createElement('div');
      titleEl.className = 'title';
      titleEl.innerHTML = title;
      notification.appendChild(titleEl);
    }
    
    // Add message
    const messageEl = document.createElement('div');
    messageEl.className = 'message';
    messageEl.innerHTML = message;
    notification.appendChild(messageEl);
    
    // Add to container
    this.container.appendChild(notification);
    this.notifications.push(notification);
    
    // Limit the number of notifications
    while (this.notifications.length > this.options.maxNotifications) {
      const oldestNotification = this.notifications.shift();
      this.remove(oldestNotification);
    }
    
    // Auto-remove after duration
    setTimeout(() => {
      this.remove(notification);
    }, notificationDuration);
    
    return notification;
  }
  
  remove(notification) {
    if (notification && notification.parentNode) {
      notification.style.animation = 'fade-out 0.3s forwards';
      
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
        
        // Remove from notifications array
        const index = this.notifications.indexOf(notification);
        if (index !== -1) {
          this.notifications.splice(index, 1);
        }
      }, 300);
    }
  }
  
  // Helper method to show different types of notifications
  success(title, message, duration) {
    return this.show(title, message, 'success', duration);
  }
  
  error(title, message, duration) {
    return this.show(title, message, 'error', duration);
  }
  
  info(title, message, duration) {
    return this.show(title, message, 'info', duration);
  }
  
  warning(title, message, duration) {
    return this.show(title, message, 'warning', duration);
  }
}

// Export for both browser and module environments
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = PopupNotification;
} else {
  window.PopupNotification = PopupNotification;
} 