import framework from 'framework'
import config from 'config'
import utils from 'utils'
import $ from 'dom-select'
import classes from 'dom-classes';
import create from 'dom-create-element'
import query from 'query-dom-components'
import event from 'dom-event'
import {on, off} from 'dom-event'

class Sub {
    
    constructor(opt = {}) {
        
        this.isMobile = config.isMobile
        
        this.view = config.$view
        this.slug = null
        this.el = null
        this.a = null
    }
    
    init(req, done) {
           
        const id = req.params.id;
        const view = this.view
        const slug = this.slug = `sub-${id}`
        
        const template = `
            <div class="vertical-center">
                <div class="vertical-el">
                    <span class="info">${id} me...</span> <br><br>
                    <ul>
                        <li class="js-profile">Profile</li>
                        <li><a href="https://www.facebook.com/profile.php?id=100011256067635">Facebook</a></li>
                        <li class="js-experience">Experience</li>
                    </ul> <br>
                    <ul>
                        <li><a href="http://mbusson.com"><< Back</a></li>                        
                    </ul>
                    <span style="font-size: 0.75rem" class="info"> To the developer's website. </span>
                </div>
                <div class="closure"> 
                    <span class="closure-el"> <a href="/home" class="js-closeabout link">×</a> </span>
                </div>
            </div>
        `
        
        this.el = create({
            selector: 'div',
            styles: `sub-item ${this.slug}`,
            html: template
        })

        this.view.appendChild(this.el)
        this.ui = query({ el: this.el })
        this.dataAdded()
        
        utils.biggie. addRoutingEL(document.querySelectorAll('.link'))

        done()
    }

    dataAdded(done) {
        on(this.ui.profile,'click', this.handleMenu)
        on(this.ui.experience, 'click', this.handleMenu)
    }

    handleMenu(e) {
      
        const target = e.currentTarget

        const profileContent = `
            <div class="js-menuwrap">
                <a class="js-close" id="image-close">×</a>
            </div>
        `
        const expContent = `
            <div class="js-menuwrap">
                <a class="js-close" id="image-close">×</a>
            </div>
        `

        if ( classes.has(target, 'js-profile') ) {

            console.log('clic profil')
            const profile = create({
              selector: 'div',
              id: 'menu-wrap',
              styles: '`is-profile-content`',
              html: profileContent
            });
            document.body.appendChild(profile)
            TweenLite.from(profile, 1, {
                autoAlpha:0, 
                x: '500%', 
                ease: Expo.easeInOut,
                y: 0
            });

        } else if ( classes.has(target, 'js-experience') ) {

            console.log('clic experience')
            const experience = create({
              selector: 'div',
              id: 'menu-wrap',
              styles: '`is-exp-content`',
              html: expContent
            });
            document.body.appendChild(experience)
            TweenLite.from(experience, 1, {
                autoAlpha:0, 
                x: '500%', 
                ease: Expo.easeInOut,
                y: 0
            });

        }

    }
    
    animateIn(req, done) {

        classes.add(config.$body, `is-${this.slug}`)

        this.el.style.display = 'block'

        const tl = new TimelineMax({ paused: true })
        tl.fromTo(this.el, 1,{x: '-320'}, { x: 0, ease: Expo.easeInOut })
        tl.restart()
        
        done()
    }

    animateOut(req, done) {
         
        classes.remove(config.$body, `is-${this.slug}`)

        const tl = new TimelineMax({ paused: true, onComplete: done })
        this.el && tl.to(this.el, 0.7, { x: '-320', ease: Expo.easeInOut, clearProps: 'all' })
        tl.restart()
    }
    
    resize(width, height) {}

    destroy(req, done) {

        this.el.parentNode.removeChild(this.el)
        this.el = null
        
        done()
    }
}

module.exports = Sub