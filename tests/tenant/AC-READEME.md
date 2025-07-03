Tenant

        ROLE
        - can create role
        - can delete role
            -- condition
            -- can not delete role until role is assigned to any user
        - can see all roles
            -- condition
            -- can not see other tenatnts's role

        = BRANCH

        - can create branch
        - can delete branch
            -- condition
            -- can not delete branch until user is allocated to branch, or data belongs to branch - FAIL
        - can see all branches
            -- condition
            -- can not see other tenatnts's branch
        = USER

        - can create user
        - can delete user
            -- condition
            -- can not delete user until user is allocated any task
        - can see all users - FAIL
            -- condition
            -- can not see other tenatnts's user
