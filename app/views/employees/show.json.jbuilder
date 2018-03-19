json.extract! @employee, :id, :name, :title

json.direct_reports do
  json.array! @employee.direct_reports.each do |emp|
    json.extract! emp, :id, :name, :title
  end
end
