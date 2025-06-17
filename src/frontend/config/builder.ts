import { builder } from '@builder.io/react';

// Initialize Builder.io with your API key
builder.init('0355fc8dd8574bd582b6401e6e692b5b');

// Set user attributes
builder.setUserAttributes({
  userType: 'business',
  environment: 'production'
});

// Set the model to use
builder.setUserAttributes({
  model: 'page'
});

// Set the content ID
builder.setUserAttributes({ 
  contentId: 'e2a9e0ba558e44e7afcf226de4e8f0bc'
});

// Export the builder instance
export { builder };