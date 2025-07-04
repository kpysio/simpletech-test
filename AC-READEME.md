SYSTEM USER LOGIN
ROLE
SYSTEM-ROLE - can create role [system-role] - can update role [system-role] - can delete role [system-role]
-- condition
-- can not delete role until role is assigned to any user - can see all own/sytem roles
-- condition
-- can not see other tenatnts's role

            TENANT-ROLE
            - can create role [tenant-role] - Select Tenant - Create role
            - can update role [system-role] - Select Tenant - Update role
            - can delete role [tenant-role] - Select Tenant - Delete role
                -- condition
                -- can not delete role until role is assigned to any user
            - can see all tenant roles - Select Tenant - View all tenant role
                -- condition
                -- can not see other tenatnts's role

TENANT USER LOGIN
ROLE
TENANT-ROLE - can create role [tenant-role] - can update role [tenant-role]
-- condition
-- created by Tenant or System user
-- can update all roles belongs to own/tenant - can delete role [tenant-role]
-- condition
-- created by Tenant or System user
-- can not delete role until role is assigned to any user - can see all own roles
-- condition
-- created by Tenant or System user
-- can see all roles belongs to own/tenant
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
