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
    class_name: :Employee,
    dependent: :destroy
end
