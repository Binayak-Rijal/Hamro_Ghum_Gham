# Backend Test Suite

This folder contains comprehensive Jest tests for the MongoDB/Mongoose backend.

## Test Files

### 1. packageModel.test.js
Tests for the Package model CRUD operations with mocked Mongoose methods.

**Coverage:**
- Create operations (with validation)
- Read operations (find, findById, queries)
- Update operations (single and multiple)
- Delete operations
- Query operations (count, exists, findOne)
- Edge cases (null values, validation errors, etc.)

### 2. bookingController.test.js
Tests for booking controller functions with mocked Mongoose models.

**Coverage:**
- `createBooking()` - Create new bookings with validation
- `getBookingsCount()` - Count user bookings (excluding cancelled)
- `getUserBookings()` - Retrieve user bookings with population
- Error handling and edge cases

### 3. packageRoutes.test.js
Tests for package API endpoints using Supertest.

**Coverage:**
- `GET /api/packages/popular` - Fetch featured packages
- `GET /api/packages` - Fetch all packages
- `GET /api/packages/:id` - Fetch single package by ID
- HTTP status codes and response formats
- Error handling (404, 500 errors)

### 4. security.test.js
Tests for authentication middleware (auth.js).

**Coverage:**
- `auth()` middleware - JWT token verification
- `adminOnly()` middleware - Admin authorization
- Token validation and error handling
- User authentication and role-based access
- Security edge cases

## Running Tests

### Run all tests:
```bash
npm test
```

### Run tests in watch mode:
```bash
npm run test:watch
```

### Run tests with coverage:
```bash
npm run test:coverage
```

### Run specific test file:
```bash
npm test packageModel.test.js
```

## Test Structure

All tests follow this pattern:
- **Arrange**: Set up test data and mocks
- **Act**: Execute the function/route being tested
- **Assert**: Verify expected outcomes

## Mocking Strategy

- **Mongoose methods**: Mocked to avoid actual database connections
- **Express req/res**: Custom mock objects for controller tests
- **JWT**: Mocked for authentication tests
- **Supertest**: Used for integration testing of API routes

## Test Coverage Areas

✅ Success cases
✅ Error cases (validation, database errors)
✅ Edge cases (null values, missing fields)
✅ Authentication & authorization
✅ HTTP status codes
✅ Response formats
✅ Security vulnerabilities

## Notes

- No actual database connection is made during tests
- All Mongoose operations are mocked
- Tests are isolated and can run in any order
- Console logs are silenced during tests
