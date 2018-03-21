class Employee < ApplicationRecord
  validates :first_name, :last_name, :title, presence: true

  belongs_to :manager,
    primary_key: :id,
    foreign_key: :manager_id,
    class_name: :Employee,
    optional: true

  has_many :direct_reports,
    primary_key: :id,
    foreign_key: :manager_id,
    class_name: :Employee

  before_destroy :update_direct_reports
  before_update :check_for_loop

  def name
    self.first_name + ' ' + self.last_name
  end

  def has_direct_reports?
    !self.direct_reports.empty?
  end

  private

  def check_for_loop
    employee = self.clone
    employeeId = employee.id
    while employee.manager_id
      if employee.manager_id == employeeId
        throw(:abort)
      else
        employee = employee.manager
      end
    end
  end

  def update_direct_reports
    self.direct_reports.update_all(manager_id: self.manager_id)
  end

end
