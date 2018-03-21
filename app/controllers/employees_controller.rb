class EmployeesController < ApplicationController
  def create
    @employee = Employee.new(employee_params)
    unless @employee.save
      if @employee.errors.full_messages.empty?
        @notice = "Invalid attributes"
      else
        @notice = @employee.errors.full_messages[0]
      end
    end
    render :notice
  end

  def destroy
    @employee = Employee.find(params[:id])
    @notice = "Can't delete!" unless @employee.destroy!
    render :notice
  end

  def index
    @employees = Employee.where(manager_id: nil)
    render "employees/index.json.jbuilder"
  end

  def show
    @employee = Employee.find(params[:id])
    if @employee
      render json: @employee
    else
      @notice = @employee.errors.full_messages
      render :notice
    end
  end

  def update
    @employee = Employee.find(params[:id])
    unless @employee.update_attributes(employee_params)
      if @employee.errors.full_messages.empty?
        @notice = "Can't create loops in hierarchy"
      else
        @notice = @employee.errors.full_messages[0]
      end
    end
      render :notice
  end

  private

  def employee_params
    params.require(:employee).permit(:id, :first_name, :last_name, :title, :manager_id)
  end
end
