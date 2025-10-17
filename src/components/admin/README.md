# Admin Components

This directory contains the separated admin dashboard components for better code organization and maintainability.

## Components

### StudentManagement

- Manages student approvals and deletions
- Displays student information with skills and status
- Handles pending approval workflow

### EventManagement

- Manages event creation, editing, and deletion
- Includes form dialog for adding/editing events
- Displays event details with status badges

### RegistrationManagement

- Manages event registrations
- Handles registration status updates (pending, confirmed, cancelled)
- Displays registration details with student and event information

### CommitteeManagement

- Manages committee member creation, editing, and deletion
- Includes form dialog for adding/editing members
- Displays member information with contact details

### TestimonialManagement

- Manages testimonial creation, editing, and deletion
- Includes form dialog for adding/editing testimonials
- Displays testimonial content with status management

## Custom Hooks

### useAdminData

- Handles data fetching for all admin entities
- Manages loading states
- Provides data refresh functionality

### useAdminForm

- Manages form dialog state
- Handles form data and editing state
- Provides dialog open/close functionality

### useAdminActions

- Contains all CRUD operations for admin entities
- Handles API calls for create, update, delete operations
- Manages state updates after operations

## Benefits of This Structure

1. **Separation of Concerns**: Each component handles a specific domain
2. **Reusability**: Components can be reused in other parts of the application
3. **Maintainability**: Easier to debug and modify individual features
4. **Testability**: Each component can be tested independently
5. **Code Organization**: Related functionality is grouped together
6. **Custom Hooks**: Business logic is separated from UI components
