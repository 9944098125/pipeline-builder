---
globs: prisma/**/*, packages/database/**/*, **/*.prisma, supabase/**/*
alwaysApply: false
---

# Database Schema

Quick reference for managing the database schema using Prisma and workspace scripts.

## Tasks

1. **Edit the Prisma schema**

   - Open the Prisma schema file in the database package:
     - `libs/database/prisma/schema.prisma`
   - Make your schema changes.

2. **Save a migration (do not generate migrations manually)**

   - To save a migration after updating the schema:
     - `yarn nx run database:prisma-create-migration --name=<name>`
     - _This prepares the migration files but does not apply them._

3. **Apply migrations (migrate your local database)**

   - To run migrations on your local database:
     - `yarn nx run database:prisma-apply-migrations`
     - _This command applies migrations and updates the database._

4. **Do not manually generate migrations using `prisma migrate dev` or `prisma migrate save`. Always use the provided workspace scripts.**

## Reference

Always use Yarn and Nx targets for Prisma operations instead of direct Prisma CLI commands.

- Prisma schema location: `libs/database/prisma/schema.prisma`
- Creating migration: `yarn nx run database:prisma-create-migration --name=<name>`
- Applying migrations: `yarn nx run database:prisma-apply-migrations`
- Generate Prisma types: `prisma-generate` - Generate Prisma Client
- Format Prisme schema: `prisma-format` - Format the Prisma schema
- Reset database: `prisma-reset` - Reset database (force enabled)
- Resolve Prisma migration issues: `prisma-resolve` - Resolve migration issues
- Validate Prisma schema: `prisma-validate` - Validate Prisma schema

### Examples

✅ **CORRECT - Use Nx targets:**

```bash
yarn nx run database:prisma-create-migration --name=migration-name
yarn nx run database:prisma-generate
yarn nx run database:prisma-format
```

❌ **INCORRECT - Don't use direct Prisma CLI:**

```bash
npx prisma migrate dev --name migration-name
npx prisma generate
```

## Prisma Models

- Use proper model naming
- Implement proper relations
- Use proper field types
- Define proper indexes
- Implement proper constraints
- Use proper enums

## Prisma Queries

- Use proper query optimization
- Implement proper filtering
- Use proper relations loading
- Handle transactions properly
- Implement proper pagination
- Use proper aggregations

## Database Design

- Use proper normalization
- Implement proper indexing
- Use proper constraints
- Define proper relations
- Implement proper cascades
- Use proper data types

## Performance

- Use proper connection pooling
- Implement proper caching
- Use proper query optimization
- Handle N+1 queries properly
- Implement proper batching
- Monitor performance metrics

## Security

- Use proper authentication
- Implement proper authorization
- Handle sensitive data properly
- Use proper encryption
- Implement proper backups
- Monitor security issues

## Seeding

Use the following command for seeding:

```bash
yarn nx run database:seed
```
