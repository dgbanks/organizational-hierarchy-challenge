Rails.application.routes.draw do
  
  namespace :api, defaults: { format: :json } do
    resources :employees, only: %i(create show index update destroy)
  end
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

end