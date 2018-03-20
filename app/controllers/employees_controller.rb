class EmployeesController < ApplicationController
  def create
    @employee = Employee.new(employee_params)
    if @employee.save
      # render json: @employee
      render :show
    else
      render json: @employee.errors.full_messages, status: 422
    end
  end

  def destroy
    @employee = Employee.find(params[:id])
    @employee.destroy
    render json: {}
  end

  def index
    # @employee = Employee.find_by_manager_id(nil)
    @employees = Employee.where(manager_id: nil)
    render "employees/index.json.jbuilder"
    # written with full path to allow access to GET '/'
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

  def employee_params
    params.require(:employee).permit(:first_name, :last_name, :title, :manager_id)
  end
end
