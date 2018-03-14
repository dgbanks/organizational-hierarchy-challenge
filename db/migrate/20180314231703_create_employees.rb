class CreateEmployees < ActiveRecord::Migration[5.1]
  def change
    create_table :employees do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :title, null: false
      t.integer :manager_id
      t.timestamps
    end
    add_index :employees, :manager_id
  end
end
