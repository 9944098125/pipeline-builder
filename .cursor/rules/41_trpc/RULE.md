---
description: tRPC API Endpoint Structure and Usage Guide
alwaysApply: false
---

# tRPC API Endpoint Structure and Usage Guide

This document explains how tRPC API endpoints are structured in this codebase and how to add new ones.

## Architecture Overview

The tRPC API follows a modular architecture with a clear separation of concerns:

## Available Procedure Types

### 1. `publicProcedure`

### 2. `protectedProcedure`

## Adding New Endpoints`

### Method 1: Manual Implementation

## Key Concepts

### Error Handling

The tRPC setup includes:

- **Development**: Full error details with stack traces
- **Production**: Sanitized error messages for security
- **Custom Error Formatter**: Consistent error response format

## Best Practices

3. **Proper Input Validation**: Always use Zod schemas for input validation
4. **Structured Logging**: Use the injected `LoggerService` for consistent logging
5. **Direct Returns**: Return data directly from endpoints (no wrapper objects needed)
6. **Type Safety**: Use proper TypeScript types for all inputs and outputs

## File Structure

## Testing

## Environment Variables

## Migration Notes
