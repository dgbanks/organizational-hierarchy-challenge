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
    # dependent: :destroy

  before_destroy :update_direct_reports

  def name
    self.first_name + ' ' + self.last_name
  end

  def has_direct_reports?
    !self.direct_reports.empty?
  end

  private

  def update_direct_reports
    self.direct_reports.update_all(manager_id: self.manager_id)
  end

end
