class EmployeesController < ApplicationController
  def create
    @employee = Employee.new(employee_params)
    if @employee.save
      render :show
    else
      render json: @employee.errors.full_messages, status: 422
    end
  end

  def destroy
    @employee = Employee.find(params[:id])
    @employee.destroy!
    render :show
  end

  def index
    @employees = Employee.where(manager_id: nil)
    render "employees/index.json.jbuilder"
  end

  def show
    @employee = Employee.find(params[:id])
    render :show
  end

  def update
    @employee = Employee.find(params[:id])
    if @employee.update_attributes(employee_params)
      render :show
    else
      render json: @employee.errors.full_messages, status: 422
    end
  end

  private

  def employee_params
    params.require(:employee).permit(:id, :first_name, :last_name, :title, :manager_id)
  end
end
