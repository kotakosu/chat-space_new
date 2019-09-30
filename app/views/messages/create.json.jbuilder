json.id @message.id
json.user_name @message.user.name
json.date @message.created_at.strftime
json.content @message.content
json.image @message.image_url