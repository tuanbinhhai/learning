class CommentService
  def initialize(params)
    @car_id = params[:car_id]
    @content = params[:content]
    @id = params[:comment_id]
    @user = params[:user]
  end

  # Return new comment if success and false if have error
  def create
    user = User.find(@user)
    new_comment = user.comments.create(comment_attributes)
    if new_comment.id
      new_comment
    else
      false
    end
  rescue
    false
  end

  # Return comment if success and false if have error
  def update
    if Comment.find(@id).user == User.find(@user)
      comment = Comment.find(update_attributes[:id])
      comment.update_attribute(:content, update_attributes[:content])
    end
    rescue
      false
    end

  private

  def comment_attributes
    {
      car_id: @car_id,
      content: @content
    }
  end

  def update_attributes
    {
      id: @id,
      content: @content
    }
  end
  end
