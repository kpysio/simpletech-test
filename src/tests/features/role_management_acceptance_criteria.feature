
Feature: System Role Management

  Scenario: Create a system role
    Given I am logged in as a system user
    When I create a new system role
    Then the role should be saved successfully

  Scenario: Update a system role
    Given I am logged in as a system user
    And a system role exists
    When I update the role
    Then the changes should be saved successfully

  Scenario: Delete a system role that is not assigned
    Given I am logged in as a system user
    And the role is not assigned to any user
    When I delete the role
    Then the role should be deleted

  Scenario: Delete a system role that is assigned to a user
    Given I am logged in as a system user
    And the role is assigned to a user
    When I attempt to delete the role
    Then I should receive an error message preventing deletion

  Scenario: View system roles
    Given I am logged in as a system user
    When I view system roles
    Then I should only see roles from my own system context

Feature: Tenant Role Management (as System User)

  Scenario: Create a tenant role
    Given I am logged in as a system user
    And I have selected a tenant
    When I create a tenant role
    Then the role should be saved under the selected tenant

  Scenario: Update a tenant role
    Given I am logged in as a system user
    And I have selected a tenant
    When I update a tenant role
    Then the role should be updated for that tenant

  Scenario: Delete a tenant role not assigned to any user
    Given I am logged in as a system user
    And the tenant role is not assigned to any user
    When I delete the tenant role
    Then it should be deleted

  Scenario: Delete a tenant role assigned to users
    Given I am logged in as a system user
    And the tenant role is assigned to at least one user
    When I attempt to delete the role
    Then I should receive an error preventing deletion

  Scenario: View tenant roles
    Given I am logged in as a system user
    And I have selected a tenant
    When I view roles for the tenant
    Then I should see all roles for that tenant only
    And I should not see roles from other tenants

Feature: Tenant Role Management (as Tenant User)

  Scenario: Create a tenant role
    Given I am logged in as a tenant user
    When I create a tenant role
    Then the role should be created under my tenant

  Scenario: Update a tenant role
    Given I am logged in as a tenant user
    And the role belongs to my tenant
    When I update the role
    Then the changes should be saved

  Scenario: Delete a tenant role not assigned to users
    Given I am logged in as a tenant user
    And the role is not assigned to any user
    When I delete the role
    Then the role should be deleted

  Scenario: Delete a tenant role assigned to users
    Given I am logged in as a tenant user
    And the role is assigned to one or more users
    When I attempt to delete the role
    Then I should receive an error message

  Scenario: View tenant roles
    Given I am logged in as a tenant user
    When I view tenant roles
    Then I should see only roles created for my tenant
    And I should not see roles from other tenants

Feature: Branch Management

  Scenario: Create a branch
    Given I am logged in as a tenant user or system user
    When I create a new branch
    Then the branch should be created under my tenant

  Scenario: Delete a branch with no users or data
    Given I am logged in as a tenant user
    And the branch has no users or associated data
    When I delete the branch
    Then the branch should be deleted

  Scenario: Delete a branch with assigned users or data
    Given I am logged in as a tenant user
    And the branch has users or data
    When I attempt to delete the branch
    Then I should receive an error message

  Scenario: View branches
    Given I am logged in as a tenant user
    When I view branches
    Then I should only see branches from my own tenant

Feature: User Management

  Scenario: Create a user
    Given I am logged in as a tenant user
    When I create a new user
    Then the user should be created under my tenant

  Scenario: Delete a user not assigned to tasks
    Given I am logged in as a tenant user
    And the user is not assigned to any tasks
    When I delete the user
    Then the user should be deleted

  Scenario: Delete a user assigned to tasks
    Given I am logged in as a tenant user
    And the user is assigned to one or more tasks
    When I attempt to delete the user
    Then I should receive an error message

  Scenario: View users
    Given I am logged in as a tenant user
    When I view users
    Then I should only see users from my own tenant
    And I should not see users from other tenants
