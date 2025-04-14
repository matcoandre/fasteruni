import json, os
from flask import Flask, jsonify, request, render_template, redirect
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)


def get_list_users(file='./users.json'):
    with open(file) as f:
        data = json.load(f)
    return data

def save(data, file='./users.json'):
    with open(file, 'w') as f:
        json.dump(data, f, indent=4)

@app.get('/users')
def get_users():
    return jsonify(get_list_users())

@app.get('/users/delete/<id_>')
def delete_user(id_: int):
    users = get_list_users()
    for user in users:
        if user['id'] == int(id_):
            del users[users.index(user)]
    save(users)
    return 'eliminatolo'

@app.get('/users/edit/<id_>/<password>')
def edit_user(id_: int, password: str):
    users = get_list_users()
    for user in users:
        if user['id'] == int(id_):
            user['password'] = password
    
    save(users)
    return 'modificatolo'

@app.post('/users/add')
def add_user():
    data = request.form

    users = get_list_users()
    users.append({
        'id': users[len(users) - 1]['id'] + 1,
        'role': data.get('role'),
        'name': f'{data.get("name")} {data.get("surname")}',
        'user': data.get('user'),
        'password': data.get('pw')
    })
    
    save(users)
    return redirect('http://127.0.0.1:5500/html/gestisciAcc.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8083, debug=True)
