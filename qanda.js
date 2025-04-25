<script>
        const ADMIN_PASSWORD = "admin123"; // Change this password for security
        
        function postQuestion() {
            let name = document.getElementById('nameInput').value.trim();
            let questionText = document.getElementById('questionInput').value.trim();
            if (name === '' || questionText === '') return;
            
            let questionDiv = document.createElement('div');
            questionDiv.className = 'question';
            questionDiv.innerHTML = `<p><strong>${name}:</strong> ${questionText}</p>` +
                `<span class='reply-link' onclick='showReplyBox(this)'>Reply</span>` +
                `<span class='delete-btn' onclick='deletePost(this)'>Delete</span>` +
                `<div class='answers'></div>`;
            
            document.getElementById('qaSection').appendChild(questionDiv);
            document.getElementById('nameInput').value = '';
            document.getElementById('questionInput').value = '';
        }
        
        function showReplyBox(replyLink) {
            let parentDiv = replyLink.parentElement;
            let existingInput = parentDiv.querySelector("input[type='text']");
            let existingButton = parentDiv.querySelector("button:not(.delete-btn)");
            
            if (!existingInput) {
                let nameBox = document.createElement("input");
                nameBox.type = "text";
                nameBox.placeholder = "Your name...";
                
                let inputBox = document.createElement("input");
                inputBox.type = "text";
                inputBox.placeholder = "Write a reply...";
                
                let submitButton = document.createElement("button");
                submitButton.innerText = "Submit";
                submitButton.onclick = function() { postAnswer(nameBox, inputBox, parentDiv.querySelector('.answers')); };
                
                parentDiv.appendChild(nameBox);
                parentDiv.appendChild(inputBox);
                parentDiv.appendChild(submitButton);
            }
        }
        
        function postAnswer(nameBox, inputBox, answersDiv) {
            let name = nameBox.value.trim();
            let answerText = inputBox.value.trim();
            if (name === '' || answerText === '') return;
            
            let answerDiv = document.createElement('div');
            answerDiv.className = 'answer';
            answerDiv.innerHTML = `<p><strong>${name}:</strong> ${answerText}</p>` +
                `<span class='reply-link' onclick='showReplyBox(this)'>Reply</span>` +
                `<span class='delete-btn' onclick='deletePost(this)'>Delete</span>` +
                `<div class='answers'></div>`;
            
            answersDiv.appendChild(answerDiv);
            nameBox.value = '';
            inputBox.value = '';
            nameBox.style.display = 'none';
            inputBox.style.display = 'none';
            inputBox.nextElementSibling.style.display = 'none';
        }
        
        function deletePost(button) {
            let password = prompt("Enter admin password to delete this post:");
            if (password === ADMIN_PASSWORD) {
                let post = button.parentElement;
                post.remove();
            } else {
                alert("Incorrect password. You are not authorized to delete this post.");
            }
        }
    </script>
