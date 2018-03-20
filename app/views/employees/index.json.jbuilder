json.array! @employees.each do |employee|
  json.partial! "employees/employee", employee: employee
end
