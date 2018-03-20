# json.partial! "employees/employee", employee: @employee

# @employees.each do |employee|
#   json.partial! "employees/employee", employee: employee
# end


json.array! @employees.each do |employee|
  json.partial! "employees/employee", employee: employee
end
