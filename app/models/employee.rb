class Employee < ApplicationRecord
  validates :first_name, :last_name, :title, presence: true

  serialize :direct_reports, JSON

  belongs_to :manager,
    primary_key: :id,
    foreign_key: :manager_id,
    class_name: :Employee,
    optional: true

  has_many :direct_reports,
    primary_key: :id,
    foreign_key: :manager_id,
    class_name: :Employee,
    dependent: :destroy

  def name
    self.first_name + ' ' + self.last_name
  end
  
  def has_direct_reports?
    !self.direct_reports.empty?
  end

end
