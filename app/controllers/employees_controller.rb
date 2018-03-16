class EmployeesController < ApplicationController
  def create
    @employee = Employee.new(employee_params)
    if @employee.save
      render json: @employee
    else
      render json: @employee.errors.full_messages, status: 422
    end
  end

  def destroy
    @employee = Employee.find(params[:id])
    @employee.destroy
    render json: @employee
  end

  def index
    @employees = Employee.all
    # @employees = Employee.where(manager_id: nil)
    render json: @employees
  end

  def show
    @employee = Employee.find(params[:id])
    render json: @employee
  end

  def update
    @employee = Employee.find(params[:id])
    if @employee.update_attributes(employee_params)
      render json: @employee
    else
      render json: @employee.errors.full_messages, status: 422
    end
  end

  def employee_params
    params.require(:employee).permit(:first_name, :last_name, :title)
  end
end
