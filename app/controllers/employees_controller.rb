class EmployeesController < ApplicationController
  def create
    @employee = Employee.new(employee_params)
    @notice = "Invalid attributes" unless @employee.save
    render :notice
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
    if @employee.send(:no_loop?) && @employee.update_attributes(employee_params)
      render :show
    else
      @notice = "Can't create loops in hierarchy"
      render :notice
    end
  end

  private

  def employee_params
    params.require(:employee).permit(:id, :first_name, :last_name, :title, :manager_id)
  end
end
