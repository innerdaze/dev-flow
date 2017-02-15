Given(/^I have Linode credentials available$/) do
  fail unless ENV['LINODE_API_KEY']
end

Given(/^I have a "fog_mock.rb" file$/) do
  script = File.open('features/support/fog_mock.rb').read
  steps %(
    Given a file named "fog_mock.rb" with:
    """
    #{script}
    """
    )
end
