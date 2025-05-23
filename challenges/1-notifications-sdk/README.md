# Popup Notification Library

A lightweight JavaScript library for displaying popup notifications on web pages, with built-in support for postMessage events.

## Features

- 🔔 Display popup notifications with various styles (info, success, error, warning)
- 📱 Responsive and customizable
- 🌐 Listen for postMessage events to show notifications from iframes or other windows
- 🎨 Easy to style and extend
- 📊 Control over position, duration, and maximum number of notifications
- 🔄 No dependencies, works with any framework or vanilla JS

## Installation

### Via Script Tag

Simply include the script in your HTML:

```html
<script src="sdk/popup-notification.js"></script>
```

## Usage

### Basic Usage

```javascript
// Initialize the library
const notifications = new PopupNotification({
  position: 'top-right',  // top-right, top-left, bottom-right, bottom-left, top-center, bottom-center
  duration: 3000,         // Time in ms before notification disappears
  maxNotifications: 5,    // Maximum number of notifications to show at once
});

// Show different types of notifications
notifications.info('Info Title', 'This is an info message');
notifications.success('Success!', 'Operation completed successfully');
notifications.error('Error!', 'Something went wrong');
notifications.warning('Warning!', 'Please be careful');
```

### Configuration Options

The PopupNotification constructor accepts the following options:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| position | String | 'top-right' | Position of the notifications container |
| duration | Number | 3000 | Duration in milliseconds before the notification auto-dismisses |
| maxNotifications | Number | 5 | Maximum number of notifications to show at once |
| containerClass | String | 'popup-notification-container' | CSS class for the notifications container |
| notificationClass | String | 'popup-notification' | CSS class for each notification element |
| zIndex | Number | 9999 | z-index CSS property for the notifications container |
| targetOrigin | String | '*' | Target origin for postMessage validation |

### PostMessage API

You can trigger notifications from other windows or iframes using the postMessage API:

```javascript
// From another window or iframe
window.parent.postMessage({
  type: 'notification',
  title: 'Hello from iframe!',
  message: 'This notification was sent using postMessage',
  notificationType: 'success', // info, success, error, warning
  duration: 5000 // optional
}, '*');
```

## Demo

Open the [https://ajmal8080rzp.github.io/challenges/1-notifications-sdk/](https://ajmal8080rzp.github.io/challenges/1-notifications-sdk/) file in your browser to see a live demo of the library.

## License

MIT License 