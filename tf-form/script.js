document.addEventListener('DOMContentLoaded', () => {
  //.validationForm を指定した最初の form 要素を取得
  const validationForm = document.querySelector('.validationForm');
  //.validationForm を指定した form 要素が存在すれば
  if(validationForm) {
    //エラーを表示する span 要素に付与するクラス名（エラー用のクラス）
    const errorClassName = 'error';
    
    //required クラスを指定された要素の集まり  
    const requiredElems = document.querySelectorAll('.required');
    //name クラスを指定された要素の集まり
    const nameElems = document.querySelectorAll('.name')
    //addres クラスを指定された要素の集まり
    const addressElems = document.querySelectorAll('.address')
    //email クラスを指定された要素の集まり
    const emailElems =  document.querySelectorAll('.email');
    //tel クラスを指定された要素の集まり
    const telElems =  document.querySelectorAll('.tel');
    //maxlength クラスを指定された要素の集まり
    const maxlengthElems =  document.querySelectorAll('.maxlength');
    
    //エラーメッセージを表示する span 要素を生成して親要素に追加する関数
    //elem ：対象の要素
    //errorMessage ：表示するエラーメッセージ
    const createError = (elem, errorMessage) => {
      //span 要素を生成
      const errorSpan = document.createElement('span');
      //エラー用のクラスを追加（設定）
      errorSpan.classList.add(errorClassName);
      //aria-live 属性を設定
      errorSpan.setAttribute('aria-live', 'polite');
      //引数に指定されたエラーメッセージを設定
      errorSpan.textContent = errorMessage;
      //elem の親要素の子要素として追加
      elem.parentNode.appendChild(errorSpan);
    }

    //form 要素の submit イベントを使った送信時の処理
    validationForm.addEventListener('submit', (e) => {
      //エラーを表示する要素を全て取得して削除（初期化）
      const errorElems = validationForm.querySelectorAll('.' + errorClassName);
      errorElems.forEach( (elem) => {
        elem.remove(); 
      });
      
      //.required を指定した要素を検証
      requiredElems.forEach( (elem) => {
        //値（value プロパティ）の前後の空白文字を削除
        const elemValue = elem.value.trim(); 
        //値が空の場合はエラーを表示してフォームの送信を中止
        if(elemValue.length === 0) {
          createError(elem, '入力は必須です');
          e.preventDefault();
        }
      });


      nameElems.forEach((elem) => {
        const pattern = /^[\u30A0-\u30FF]+$/;
        //値が空でなければ
        if(elem.value !=='') {
          //test() メソッドで値を判定し、マッチしなければエラーを表示してフォームの送信を中止
          if(!pattern.test(elem.value)) {
            createError(elem, '全角カタカナでのご記入お願いします。');
            e.preventDefault();
          }
        }
      })

      addressElems.forEach((elem) => {
        const pattern = /^[0-9]{3}-[0-9]{4}$/;
        //値が空でなければ
        if(elem.value !=='') {
          //test() メソッドで値を判定し、マッチしなければエラーを表示してフォームの送信を中止
          if(!pattern.test(elem.value)) {
            createError(elem, '郵便番号の形式が正しくないようです。');
            e.preventDefault();
          }
        }
      })

      
      //.email を指定した要素を検証
      emailElems.forEach( (elem) => {
        //Email の検証に使用する正規表現パターン
        const pattern = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/ui;
        //値が空でなければ
        if(elem.value !=='') {
          //test() メソッドで値を判定し、マッチしなければエラーを表示してフォームの送信を中止
          if(!pattern.test(elem.value)) {
            createError(elem, 'メールアドレスの形式が正しくないようです。');
            e.preventDefault();
          }
        }
      });
      
      //.tel を指定した要素を検証
      telElems.forEach( (elem) => {
        //電話番号の検証に使用する正規表現パターン
        const pattern = /^\(?\d{2,5}\)?[-(\.\s]{0,2}\d{1,4}[-)\.\s]{0,2}\d{3,4}$/;
        //値が空でなければ
        if(elem.value !=='') {
          //test() メソッドで値を判定し、マッチしなければエラーを表示してフォームの送信を中止
          if(!pattern.test(elem.value)) {
            createError(elem, '電話番号の形式が正しくないようです。');
            e.preventDefault();
          }
        }
      });
      
      //.maxlength を指定した要素を検証
      maxlengthElems.forEach( (elem) => {
        //data-maxlength 属性から最大文字数を取得
        const maxlength = elem.dataset.maxlength;
        //または const maxlength = elem.getAttribute('data-maxlength');
        //値が空でなければ
        if(elem.value !=='') {
          //値が maxlength を超えていればエラーを表示してフォームの送信を中止
          if(elem.value.length > maxlength) {
            createError(elem, maxlength + '文字以内でご入力ください');
            e.preventDefault();
          }
        }
      });
      
      //エラーの最初の要素を取得
      const errorElem =  validationForm.querySelector('.' + errorClassName);
      //エラーがあればエラーの最初の要素の位置へスクロール
      if(errorElem) {
        const errorElemOffsetTop = errorElem.offsetTop;
        window.scrollTo({
          top: errorElemOffsetTop - 40,  //40px 上に位置を調整
          //スムーススクロール
          behavior: 'smooth'
        });
      }
    }); 
  }

  //チェックボックスの状態によるボタンの活性化
  const targetButton = document.getElementById('submitButton');
  const triggerCheckbox = document.querySelector('input[name="agree"]');

  targetButton.disabled = true;
  targetButton.classList.add('is-inactive');

  triggerCheckbox.addEventListener('change', function() {
    if (this.checked) {
      targetButton.disabled = false;
      targetButton.classList.remove('is-inactive');
      targetButton.classList.add('is-active');
    } else {
      targetButton.disabled = true;
      targetButton.classList.remove('is-active');
      targetButton.classList.add('is-inactive');
    }
  }, false);

  const buttonOpen = document.getElementById('submitButton');
  const modal = document.getElementById('easyModal');
  const buttonClose = document.getElementsByClassName('modalClose')[0];

//ボタンがクリックされた時
  buttonOpen.addEventListener('click', modalOpen);
  function modalOpen() {
    modal.style.display = 'block';
  };

//バツ印がクリックされた時
  buttonClose.addEventListener('click', modalClose);
  function modalClose() {
    modal.style.display = 'none';
  };

//モーダルコンテンツ以外がクリックされた時
addEventListener('click', outsideClose);
function outsideClose(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  };
};
});