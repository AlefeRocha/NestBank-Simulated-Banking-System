# NestBank - Simulated Banking System

This Nest.Js project simulates a banking system where users can create accounts by providing their name and email address. The system then generates a unique ID for each user. Integration with Hasura ensures data integrity by checking the uniqueness of email addresses in the database during account creation, preventing duplicate entries and issuing appropriate error responses when necessary.

Within the system, users can perform various financial transactions such as deposits, withdrawals, and account balance inquiries. Users also have a $100.00 overdraft limit. Additionally, they can permanently delete their accounts and view their transaction history. Actions, event triggers, and cron triggers have been implemented in Hasura. Whenever a user makes a withdrawal, the controller receives a notification from the database, identifies it as a withdrawal, and notifies the user about the withdrawal and its value.

Furthermore, Hasura conducts daily searches for accounts with negative balances and notifies users to settle the payment. The project employs strong typing with TypeScript and utilizes a range of technologies, including Node.Js, Express.Js, Hasura, Docker, and GraphQL.

