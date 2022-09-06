
function All(){
    var rows = $("#bodyTableCollections").find("tr").show();
}

function inProgress(){
    var rows = $("#bodyTableCollections").find("tr").hide();
    rows.filter(":contains('buy a ticket')").show();
}

function finished(){
    var rows = $("#bodyTableCollections").find("tr").hide();
    rows.filter(":not(:contains('buy a ticket'))").show();
}

function users(){
    var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("userTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[5];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}

function helpdesk(username)
{
    var subj="GALLERIA PIROLA : PROBLEM WITH "+document.getElementById("categoryHelp").value;
    var body="Hi, I'm "+username+",\n"+"I Have this problem:\n"+document.getElementById("messageHelp").value;
    window.location.assign("mailto:20033845@studenti.uniupo.it?Subject=" + encodeURIComponent(subj) + "&body=" + encodeURIComponent(body));
    document.getElementById('messageHelp').value = "";
    document.getElementById('categoryHelp').value = "";
}

function opere()
{
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInputOp");
  filter = input.value.toUpperCase();
  table = document.getElementById("opTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }

}

function colections()
{
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInputCo");
  filter = input.value.toUpperCase();
  table = document.getElementById("coTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }

}
function down(a,max)
{
  if(a<max-1)
  {
    document.getElementById(a+1).scrollIntoView();

  }
  console.log(a);
}

function up(a)
{
  if(a>0)
  {
    document.getElementById(a-1).scrollIntoView();

  }
  console.log(a);
}
