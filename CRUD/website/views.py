from flask import Blueprint, render_template, request, flash, redirect, url_for
from .models import Data
from . import db

views = Blueprint('views', __name__)

@views.route('/')
def Index():
    all_data = Data.query.all()
    return render_template('index.html', employees = all_data)



@views.route('/insert', methods = ['POST'])
def insert():
    if request.method == 'POST':
 
        name = request.form['name']
        email = request.form['email']
        phone = request.form['phone']
 
        my_data = Data(name, email, phone)
        db.session.add(my_data)
        db.session.commit()
 
        flash("Employee Inserted Successfully")
        return redirect(url_for('views.Index'))



@views.route('/update/<id>/', methods = ['GET', 'POST'])
def update(id):
    if request.method == 'POST':
        my_data = db.session.get(Data, id)

        my_data.name = request.form['name']
        my_data.email = request.form['email']
        my_data.phone = request.form['phone']
        db.session.commit()
        
        flash("Employee Updated Successfully")
        return redirect(url_for('views.Index'))
       
       
        

@views.route('/delete/<id>/', methods = ['GET','POST'])
def delete(id):
    my_data = db.session.get(Data, id)
    db.session.delete(my_data)
    db.session.commit()
    
    flash("Employee Deleted Successfully")
    return redirect(url_for('views.Index'))

