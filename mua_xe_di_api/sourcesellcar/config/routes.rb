Rails.application.routes.draw do
  root 'application#index'
  # Comments routes
  post '/comments/:car_id/', to: 'comments#create'
  patch '/comments/:comment_id/', to: 'comments#update'
  # Cars routes
  get '/cars/brands', to: 'cars#brand'
  get 'cars/models/:brand', to: 'cars#model'
  get 'cars/years/:brand/:model', to: 'cars#year'
  get 'cars/hottrend/', to: 'cars#hot_trend'
  patch '/cars/:car_id', to: 'cars#update'
  post '/cars', to: 'cars#create'
  get '/cars/:car_id', to: 'cars#car_info'
  get '/searchcar', to: 'cars#keywords_search'
  get '/filter', to: 'cars#filter'
  get '/cars/compare/:car_ids', to: 'cars#compare'
  get 'cars/spec/:brand/:model/:year', to: 'cars#spec_car'
  get 'cars/price/:brand/:model/:year', to: 'cars#price_around'
  get 'cars/price_recommend/:car_more_information_id/:kilometerage', to: 'cars#recommend_price'
  # Users routes
  get '/users/:user_id', to: 'users#info'
  get '/users/cars/:user_id', to: 'users#cars'
  patch 'users/:user_id', to: 'users#update'
  post '/signup', to: 'users#create'
  post '/signin', to: 'authentokens#create'
  post '/signout', to: 'authentokens#destroy'
  post '/cars/save/:car_id', to: 'users#save_car'
  post '/cars/unsave/:car_id', to: 'users#unsave_car'
  post '/social', to: 'social#create'
  get '/saved_car/:user_id', to: 'users#saved_car'
  get '/user/saved_list/:user_id', to: 'users#saved_car_list_detail'
  post '/users/car/draft/:car_id', to: 'cars#draft_car_info'
  # News routes
  get '/news/:pages', to: 'news#crawl_article'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
