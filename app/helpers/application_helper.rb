module ApplicationHelper
  def write_flash(message_method, options)
    html    = ""
    button  = button_tag "x", class: "close", data: { dismiss: "alert" }
    message = send(message_method)

    if message
      content_tag :div, class: options[:class] do
        html << button
        html << message
        html
      end
    end
  end
end
