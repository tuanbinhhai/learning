Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'application#index'
  # Users routes
  post '/signup', to: 'users#create'
  post '/signin', to: 'authentokens#create'
  post '/signout', to: 'authentokens#destroy'
end
