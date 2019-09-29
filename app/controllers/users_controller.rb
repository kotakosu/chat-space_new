class UsersController < ApplicationController

  def index
    @users = User.where('name LIKE(?)', "%#{params[:keyword]}%").where.not(id: current_user.id)
    
    respond_to do |format|
      format.html { redirect_to new_proup_path}
      format.json
    end
  end

  def edit
  end

end
