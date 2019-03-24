class CommentsController < ApplicationController
  include ValidateUser
  # Create comment with params receive are car_id and content
  def create
    user = User.find_by(id: params[:user_id])
    # Validate user
    unless validate_user(user, params[:authentoken])
      render json: { error: "Can't validate the user" }, status: 401
      return
    end
    comment = create_comment_with_comment_service
    if comment
      render json: comment, status: 200
    else
      render json: {
        msg: 'Error'
      }, status: 400
    end
  end

  # Update comment with params receive are comment_id and content
  def update
    user = User.find_by(id: params[:user_id])
    # Validate user
    unless validate_user(user, params[:authentoken])
      render json: { error: "Can't validate the user" }, status: 401
      return
    end
    comment = update_comment_with_comment_service
    if comment
      render json: comment, status: 200
    else
      render json: {
        msg: 'Error'
      }, status: 400
    end
  end

  private

  def create_comment_with_comment_service
    CommentService.new(content: params[:content],
                       car_id: params[:car_id], user: params[:user_id]).create
  end

  def update_comment_with_comment_service
    CommentService.new(comment_id: params[:comment_id],
                       content: params[:content], user: params[:user_id]).update
  end
end
