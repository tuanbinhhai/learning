class ApplicationController < ActionController::API
  def index
    render json: { key: "Hello World" }, status: 200
  end
end
