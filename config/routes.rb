Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root "employees#index", default: { format: :json }
  resources :employees, only: %i(create show index update destroy), defaults:{format: :json}

end
