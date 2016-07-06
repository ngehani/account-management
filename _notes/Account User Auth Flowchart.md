## Flowchart for adding user to account by email address
```
graph TD
    A[Admin adds email to account]
    A --> B(xref_user_emails examined for matching user)
    B --> C((User Email Exists))
    C -->|YES| DA[User ID is found]
    C -->|NO| DB[New user is created with ID but no name, new entry in xref_user_emails]
    DB --> E[New entry in xref_user_account_invites with pending status set true, and HASH key]
    DA --> E
    E --> F(Email with link with unique HASH key sent to user)
    F --> G(User follows email link)
    G --> H(User authenticates via Google OAuth2)
    H --> I((OAuth Authentication Success))
    I -->|YES| J(HASH key used to look up user by invite)
    I -->|NO| Z
    J --> K(userId user to look up valid user emails)
    K --> L((OAuth email matches one of the valid user emails))
    L -->|YES| M[Entry in xref_user_account_invites removed]
    L -->|NO| Z
    M -->N[Entry in xref_user_accounts added]
    N -->O((Other OAuth emails listed))
    O -->|YES| P(Other emails added to xref_user_emails)
    O -->|NO| ZZ
    P --> ZZ
    Z[401 FAILURE]
    ZZ[AUTHORIZED]
```