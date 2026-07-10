Feature: Naukri login and profile update

        Scenario: User logs in and updates profile
            Given I open the Naukri homepage
             When I click the Login link
              And I enter email "raju8velpula@gmail.com"
              And I enter password "raju7258"
              And I submit the login form
             Then I should be logged in
             When I navigate to View profile
              And I select edit theme
              And I save the profile
             Then I should see "Profile last updated - Today"
