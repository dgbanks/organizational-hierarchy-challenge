json.(employee, :id, :name, :title)
json.direct_reports do
  json.array! employee.direct_reports.each do |emp|
    json.partial! "employees/employee", employee: emp
  end if employee.has_direct_reports?
end
